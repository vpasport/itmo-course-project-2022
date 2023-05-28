FROM adoptopenjdk/openjdk11:jdk-11.0.8_10-ubuntu

# install node
ENV NODE_VERSION=16.19.1
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

# RUN apt update && apt install android-sdk -y

# ARG android=30

# ENV ANDROID_SDK_ROOT /opt/android-sdk-linux
# ENV PATH $PATH:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools:${ANDROID_SDK_ROOT}/emulator

# RUN apt-get update && apt-get install -y --no-install-recommends \
#   git \
#   git-lfs \
#   gnupg \
#   openssl \
#   unzip \
#   wget
# RUN wget --quiet  https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O /tmp/tools.zip && \
#   unzip -q /tmp/tools.zip -d /tmp && \
#   yes | /tmp/cmdline-tools/bin/sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --licenses && \
#   /tmp/cmdline-tools/bin/sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --install "cmdline-tools;latest" && \
#   rm -r /tmp/tools.zip /tmp/cmdline-tools && \
#   mkdir -p /root/.android/ && touch /root/.android/repositories.cfg \
#   apt-get remove wget unzip && apt-get autoremove && apt-get autoclean
# RUN yes | sdkmanager --licenses >/dev/null && \
#   sdkmanager --install \
#   "platforms;android-${android}" \
#   "platform-tools"

RUN apt-get update && apt-get install -y --no-install-recommends \
  git \
  git-lfs \
  gnupg \
  openssl \
  unzip \
  wget \
  zip
# download android sdk
RUN mkdir android-sdk
RUN wget https://dl.google.com/android/repository/commandlinetools-linux-6200805_latest.zip
RUN unzip commandlinetools-linux-6200805_latest -d /android-sdk/
RUN rm -rf commandlinetools-linux-6200805_latest

# setup environment variables
ENV ENV_BUILD_TOOLS_VERSION="30.0.2"
#java
ENV PATH $PATH:$JAVA_HOME/bin/
# android and tools
ENV ANDROID_HOME /android-sdk
ENV ANDROID_SDK_ROOT $ANDROID_HOME
ENV PATH $PATH:$ANDROID_SDK_ROOT/tools/bin
ENV PATH $PATH:$ANDROID_SDK_ROOT/platform-tools/bin

# setup sdkmanager
RUN /android-sdk/tools/bin/sdkmanager --install "build-tools;${ENV_BUILD_TOOLS_VERSION}" --sdk_root=${ANDROID_HOME}
RUN yes | /android-sdk/tools/bin/sdkmanager --licenses --sdk_root=${ANDROID_HOME}

# zipalign
ENV PATH $PATH:$ANDROID_HOME/build-tools/$ENV_BUILD_TOOLS_VERSION

ENV SDKMAN_DIR /root/.sdkman
ENV GRAILS_VERSION 3.3.9
ENV JAVA_VERSION 11.0.8

RUN ["mkdir", "-p", "/apps/home"]
RUN ls -la /apps/home
RUN apt-get update && apt-get install -y zip curl
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN curl -s "https://get.sdkman.io" | bash
RUN chmod a+x "$SDKMAN_DIR/bin/sdkman-init.sh"

RUN set -x \
  && echo "sdkman_auto_answer=true" > $SDKMAN_DIR/etc/config \
  && echo "sdkman_auto_selfupdate=false" >> $SDKMAN_DIR/etc/config \
  && echo "sdkman_insecure_ssl=false" >> $SDKMAN_DIR/etc/config

WORKDIR $SDKMAN_DIR
RUN [[ -s "$SDKMAN_DIR/bin/sdkman-init.sh" ]] && source "$SDKMAN_DIR/bin/sdkman-init.sh" && exec "$@"

RUN source /root/.bashrc
# RUN source "$SDKMAN_DIR/bin/sdkman-init.sh" && sdk install java 11
# RUN source "$SDKMAN_DIR/bin/sdkman-init.sh" && sdk install grails $GRAILS_VERSION
RUN source "$SDKMAN_DIR/bin/sdkman-init.sh" && sdk install gradle 7.3.3

# RUN wget https://services.gradle.org/distributions/gradle-6.4.1-bin.zip -P /tmp
# RUN unzip -d /opt/gradle /tmp/gradle-*.zip
# ENV GRADLE_HOME /opt/gradle/gradle-6.4.1
# ENV PATH ${GRADLE_HOME}/bin:${PATH}

WORKDIR /app
COPY / ./


RUN npm cache clean --force
RUN npm install -g @ionic/cli
RUN npm i -g cordova
RUN npm ci

RUN cordova telemetry off
RUN rm -rf platforms
RUN rm -rf android
RUN ionic cordova platform rm android
RUN ionic cordova platform add android
RUN ionic cordova build android
