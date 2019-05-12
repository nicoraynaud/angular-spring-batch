#!/usr/bin/env groovy

node {

    /**
    * Setting global variable for this build
    * branch                = git compliant branch name
    * artifactoryBaseUrl    = Artifactory base URL
    * towerTemplateUrl      = Ansible Tower job template URL
    * intEnv                = Integration environment settings (for automatic deployment)
    **/
    def branch = env.BRANCH_NAME.replaceAll('/','-')
    properties([parameters([booleanParam(defaultValue: false, description: 'Si activé, le build publiera la release sur Artifactory. (Attention, une release npm ne peut pas être modifée par la suite)', name: 'RELEASE')]),
    disableConcurrentBuilds(), buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '15', numToKeepStr: '10'))])

    /**
    * Set configuration environment
    **/
    stage('config') {
        // Set Java JDK in path
        env.JAVA_HOME="${tool 'java-8'}"
        env.PATH="${env.JAVA_HOME}/bin:${env.PATH}"

        // Set Gradle tool and add it to the path
        def gradleHome = tool 'gradle-4.10.2'
        env.PATH = "${gradleHome}/bin:${env.PATH}"
    }

    /**
    * Checkout latest branch code
    **/
    stage('checkout') {
        checkout scm
    }

    /**
    * Install tools & build
    **/
    stage('install tools') {
        sh "gradle npm_install -PnodeInstall --no-daemon"
    }

    /**
    * Install tools & build
    **/
    stage('build') {
        sh "gradle npm_run_build -PnodeInstall --no-daemon"
    }

    /**
     * Publish artifact
     **/
    stage('publish') {

        /**
        * Execute following steps
        * only when on the (main) master branch
        **/
        if (branch.equals("master") && RELEASE == "true") {
              configFileProvider([configFile(fileId: 'npmrc', targetLocation: '.npmrc')]) {
                  dir('dist/angular-spring-batch') {
                    sh "gradle -p ../.. npm_publish_dist/angular-spring-batch --no-daemon"
                  }
              }
          }
      }

    stage('delete workspace'){
      deleteDir()
    }
}
