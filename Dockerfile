# Stage 1: Build the application
# Use a full JDK to compile the code and build the JAR
FROM eclipse-temurin:17-jre-jammy as builder
    # ... your application's build steps
# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

RUN chmod +x ./mvnw
# Build the JAR file, skipping tests for a faster build
RUN ./mvnw package -DskipTests

# Stage 2: Create the final, lightweight image
# Use a JRE to run the application, as it's much smaller than a JDK
FROM openjdk:17-jre-slim

# Set the working directory for the runtime
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=builder /app/target/*.jar ./app.jar

# Expose the port that your Spring Boot application runs on
EXPOSE 8080

# Define the command to run the application
# This is what Render will execute to start your service
CMD ["java", "-jar", "app.jar"]