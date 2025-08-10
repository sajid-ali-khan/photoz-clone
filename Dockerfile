# ================================
# Stage 1: Build the Spring Boot app
# ================================
FROM eclipse-temurin:17-jdk-jammy AS builder

WORKDIR /app

# Copy Maven wrapper and config first (for dependency caching)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make mvnw executable & download dependencies
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy the source code
COPY src ./src

# Build the jar
RUN ./mvnw package -DskipTests

# ================================
# Stage 2: Run the application
# ================================
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Copy the jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
