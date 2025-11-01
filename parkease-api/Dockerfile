# Stage 1: Build the application
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy the POM and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the source code and build the JAR
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the final, lightweight image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/parkease-api-*.jar app.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]