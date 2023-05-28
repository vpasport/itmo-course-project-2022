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


# ENV ANDROID_SDK_ROOT /opt/android-sdk-linux
# ENV PATH $PATH:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools:${ANDROID_SDK_ROOT}/emulator

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    git-lfs \
    gnupg \
    openssl \
    unzip \
    wget
# RUN wget --quiet  https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O /tmp/tools.zip && \
#     unzip -q /tmp/tools.zip -d /tmp && \
#     yes | /tmp/cmdline-tools/bin/sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --licenses && \
#     /tmp/cmdline-tools/bin/sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --install "cmdline-tools;latest" && \
#     rm -r /tmp/tools.zip /tmp/cmdline-tools && \
#     mkdir -p /root/.android/ && touch /root/.android/repositories.cfg \
#     apt-get remove wget unzip && apt-get autoremove && apt-get autoclean
# RUN yes | sdkmanager --licenses >/dev/null && \
#     sdkmanager --install \
#     "platforms;android-31" \
#     "platform-tools"

# RUN yes | sdkmanager --licenses >/dev/null && \
#     sdkmanager --install \
#     "platforms;android-30" \
#     "platform-tools" \
#     "build-tools;30.0.2"

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

WORKDIR /app
COPY / ./



RUN npm cache clean --force
RUN npm ci
# RUN npm run clean-android
RUN npm run build-android