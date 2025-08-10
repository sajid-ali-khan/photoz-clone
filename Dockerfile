# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-jammy AS builder

WORKDIR /app

# Copy Maven wrapper and pom.xml first (better caching of dependencies)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (cached unless pom.xml changes)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy the rest of the source code
COPY src ./src

# Build the JAR file, skipping tests
RUN ./mvnw package -DskipTests

# Stage 2: Run the application in a smaller image
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Copy the JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
