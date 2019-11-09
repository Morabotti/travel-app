package fi.morabotti.travelapp;

import fi.jubic.snoozy.ServerConfigurator;
import fi.jubic.easyconfig.annotations.EasyConfigProperty;
import fi.jubic.easyconfig.jooq.JooqConfiguration;
import fi.jubic.snoozy.ServerConfiguration;

import javax.inject.Singleton;

@Singleton
public class Configuration implements ServerConfigurator {
    private final String deploymentEnvironment;
    private final ServerConfiguration serverConfiguration;
    private final JooqConfiguration jooqConfiguration;

    public Configuration(
            @EasyConfigProperty("DEPLOYMENT_ENVIRONMENT") String deploymentEnvironment,
            @EasyConfigProperty("SERVER_") ServerConfiguration serverConfiguration,
            @EasyConfigProperty("") JooqConfiguration jooqConfiguration
    ) {
        this.deploymentEnvironment = deploymentEnvironment;
        this.serverConfiguration = serverConfiguration;
        this.jooqConfiguration = jooqConfiguration;
    }

    public boolean isDevelopmentEnv() {
        return deploymentEnvironment.equalsIgnoreCase("development");
    }

    @Override
    public ServerConfiguration getServerConfiguration() {
        return serverConfiguration;
    }

    public JooqConfiguration getJooqConfiguration() {
        return jooqConfiguration;
    }
}
