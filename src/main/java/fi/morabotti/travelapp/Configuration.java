package fi.morabotti.travelapp;

import fi.jubic.snoozy.ServerConfigurator;
import fi.jubic.easyconfig.annotations.EasyConfigProperty;
import fi.jubic.easyconfig.jooq.JooqConfiguration;
import fi.jubic.snoozy.ServerConfiguration;

import javax.inject.Singleton;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


@Singleton
public class Configuration implements ServerConfigurator {
    private final String deploymentEnvironment;
    private final ServerConfiguration serverConfiguration;
    private final JooqConfiguration jooqConfiguration;

    public Configuration(
            @EasyConfigProperty("SERVER_") ServerConfiguration serverConfiguration,
            @EasyConfigProperty("DEPLOYMENT_ENVIRONMENT") String deploymentEnvironment,
            @EasyConfigProperty("") JooqConfiguration jooqConfiguration
    ) {
        this.serverConfiguration = serverConfiguration;
        this.deploymentEnvironment = deploymentEnvironment;
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
