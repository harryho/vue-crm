FROM  openjdk:8-jdk-slim-buster
LABEL maintainer="Andrey Lopoes <andrey.lopes@teknisa.com>"

ENV GRADLE_HOME /opt/gradle
ENV GRADLE_VERSION 5.3.1
ENV GRADLE_USER_HOME /home/gradle
ENV SDK="sdk-tools-linux-4333796.zip" \
    ANDROID_HOME="/opt/android-sdk-linux" \
    GLIBC_VERSION="2.28-r0" \
    PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/opt/android-sdk-linux/tools:/opt/android-sdk-linux/tools/bin:/opt/android-sdk-linux/platform-tools"

RUN ln -s /usr/local/openjdk-8/bin/java /usr/bin/java \
    && apt-get update && apt-get install -y git wget curl fish unzip \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get install -y nodejs \
    && curl -L https://npmjs.org/install.sh | sh \
	&& curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash \
	&& set -o errexit -o nounset \
    && echo "Downloading Gradle" && cd /tmp \
    && wget https://services.gradle.org/distributions/gradle-5.3.1-bin.zip \
    && mv gradle-5.3.1-bin.zip gradle.zip \
    && unzip -q gradle.zip \
    && rm gradle.zip \
    && mv "gradle-${GRADLE_VERSION}" "${GRADLE_HOME}/" \
    && ln -s "${GRADLE_HOME}/bin/gradle" /usr/bin/gradle \
    && echo "Adding gradle user and group" \
    && groupadd -r gradle \
    && useradd -ms /bin/bash gradle -g gradle \
    && mkdir /home/gradle/.gradle \
    && chown -R gradle:gradle /home/gradle \
    && echo "Symlinking root Gradle cache to gradle Gradle cache" \
    && ln -s /home/gradle/.gradle /root/.gradle \
    && set -o errexit -o nounset \
    && echo "Testing Gradle installation" \
	&& cd /tmp && wget https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip \
    && mkdir ${ANDROID_HOME} \
    && echo "Unziping Android SDK" \
    && unzip -q $SDK -d ${ANDROID_HOME} \
    && mkdir ~/.android/ \
    && touch ~/.android/repositories.cfg \
    && rm -rf sdk* \
    && echo "Installing SDK Licenses" \
    && yes | sdkmanager --licenses \
    && echo "Installing SDK tools/platform-tools" \
    && sdkmanager "tools" "platform-tools" \
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
    "build-tools;27.0.0" \
    && echo "Install Cordova" \
    && npm install -g cordova \
    && cordova telemetry off \
    && mkdir /workspace \
    && npm install -g npm 

VOLUME /workspace
WORKDIR /workspace
