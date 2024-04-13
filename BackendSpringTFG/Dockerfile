#docker build -t tfg-back:latest .
FROM azul/zulu-openjdk:19
LABEL maintainer="caraz0"
COPY target/TFG-0.0.1-SNAPSHOT.jar TFG.jar
ENTRYPOINT ["java", "-jar", "TFG.jar"]
#docker build -t back-spring .
#docker tag tfg-back caraz0/tfg-back:v1
#docker push caraz0/tfg-back:v1