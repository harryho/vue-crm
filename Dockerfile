FROM openjdk:8-alpine3.9
LABEL maintainer="Cristiano Santana <lexcrt@gmail.com>"

# Link javac installation
RUN ln -s /usr/lib/jvm/java-1.8-openjdk/bin/javac /usr/bin/javac

# Node Installation
RUN apk add --no-cache git nodejs-current-npm bash wget curl fish && rm -rf /var/cache/apk/*

# ENV NPM_CONFIG_PREFIX=/home/node/.npm-global \
#     PATH=$PATH:/home/node/.npm-global/bin

# Gradle Installation

# CMD ["gradle"]

ENV GRADLE_HOME /opt/gradle
ENV GRADLE_VERSION 6.5.1

RUN set -o errexit -o nounset \
    && echo "Downloading Gradle"

ADD https://services.gradle.org/distributions/gradle-6.5.1-bin.zip gradle.zip
# ADD /gradle-5.3.1-bin.zip gradle.zip

RUN echo "Installing Gradle" \
    && unzip -q gradle.zip \
    && rm gradle.zip \
    && mkdir -p /opt \
    && mv "gradle-${GRADLE_VERSION}" "${GRADLE_HOME}/" \
    && ln -s "${GRADLE_HOME}/bin/gradle" /usr/bin/gradle \
    \
    && echo "Adding gradle user and group" \
    && addgroup -S -g 1000 gradle \
    && adduser -D -S -G gradle -u 1000 -s /bin/ash gradle \
    && mkdir /home/gradle/.gradle \
    && chown -R gradle:gradle /home/gradle \
    \
    && echo "Symlinking root Gradle cache to gradle Gradle cache" \
    && ln -s /home/gradle/.gradle /root/.gradle

ENV GRADLE_USER_HOME /home/gradle

RUN set -o errexit -o nounset \
    && echo "Testing Gradle installation" \
    && gradle --version 

# Android SDK Installation
ENV SDK="sdk-tools-linux-4333796.zip" \
    ANDROID_HOME="/opt/android-sdk-linux" \
    GLIBC_VERSION="2.28-r0" \
    PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/opt/android-sdk-linux/tools:/opt/android-sdk-linux/tools/bin:/opt/android-sdk-linux/platform-tools"

# Install required dependencies
RUN wget -q https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub -O /etc/apk/keys/sgerrand.rsa.pub && \
    wget -q https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk -O /tmp/glibc.apk && \
    wget -q https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-bin-${GLIBC_VERSION}.apk -O /tmp/glibc-bin.apk && \
    apk add --no-cache /tmp/glibc.apk /tmp/glibc-bin.apk && \
    apk add --virtual .rundeps $runDeps && \
    rm -rf /tmp/* && \
    rm -rf /var/cache/apk/*

ADD "https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip" /
# ADD /sdk-tools-linux-4333796.zip /sdk-tools-linux-4333796.zip

RUN mkdir ${ANDROID_HOME} \
    && echo "Unziping Android SDK" \
    && unzip -q $SDK -d ${ANDROID_HOME} \
    && mkdir ~/.android/ \
    && touch ~/.android/repositories.cfg \
    && rm $SDK \
    && echo "Installing SDK Licenses" \
# Accept licenses before installing components, no need to echo y for each component
# License is valid for all the standard components in versions installed from this file
# Non-standard components: MIPS system images, preview versions, GDK (Google Glass) and Android Google TV require separate licenses, not accepted there
    && yes | sdkmanager --licenses \
# Platform tools
    && echo "Installing SDK tools/platform-tools" \
    && sdkmanager \
#    "emulator" \
    "tools" \
    "platform-tools" \
# SDKs
# Please keep these in descending order!
# The `yes` is for accepting all non-standard tool licenses.
    && echo "Accepting licenses for SDK tools/platform-tools" \
    && yes | sdkmanager \
    "platforms;android-28" \
    "platforms;android-27" \
    "build-tools;28.0.3" \
    "build-tools;28.0.2" \
    "build-tools;28.0.1" \
    "build-tools;28.0.0" \
    "build-tools;27.0.3" \
    "build-tools;27.0.2" \
    "build-tools;27.0.1" \
    "build-tools;27.0.0"

VOLUME /workspace
WORKDIR /workspace

# ENTRYPOINT ["/bin/bash"]