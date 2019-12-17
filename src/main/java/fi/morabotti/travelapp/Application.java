package fi.morabotti.travelapp;

import fi.jubic.snoozy.MethodAccess;
import fi.jubic.snoozy.StaticFiles;
import fi.jubic.snoozy.filters.UrlRewrite;
import fi.jubic.easyschedule.TaskScheduler;
import fi.jubic.easyschedule.StartupScheduler;
import fi.jubic.easyschedule.liquibase.LiquibaseTask;
import fi.jubic.easyschedule.dbunit.DbUnitTask;
import fi.jubic.snoozy.undertow.UndertowServer;
import fi.jubic.snoozy.Snoozy;
import fi.morabotti.travelapp.resources.*;

import java.util.stream.Collectors;
import javax.ws.rs.ApplicationPath;
import javax.inject.Inject;

import java.util.Set;
import java.util.Collections;
import java.util.stream.Stream;

@ApplicationPath("api")
public class Application extends fi.jubic.snoozy.Application {
    @Inject
    Configuration config;

    @Inject
    CustomerResource customerResource;

    @Inject
    TravelResource travelResource;

    @Inject
    OrderResource orderResource;

    @Inject
    Application() { }

    @Override
    public Set<StaticFiles> getStaticFiles() {
        return Collections.singleton(
                StaticFiles.builder()
                        .setPrefix("static")
                        .setClassLoader(Application.class.getClassLoader())
                        .setMethodAccess(MethodAccess.anonymous())
                        .setRewrite(
                                UrlRewrite.builder()
                                        .setFrom("^\\/(?!(((api|assets).*)|.*\\.(html|js)$)).*$")
                                        .setTo("/index.html")
                                        .build()
                        )
                        .build()
        );
    }

    @Override
    public Set<Object> getSingletons() {
        return Stream.concat(
                Stream.of(
                        customerResource,
                        travelResource,
                        orderResource
                ),
                Snoozy.builtins().stream()
        ).collect(Collectors.toSet());
    }


    public static void main(String[] args) {
        Application application = DaggerApplicationComponent
                .create()
                .getApplication();

        TaskScheduler startupScheduler = new StartupScheduler()
                .registerStartupTask(
                        new LiquibaseTask(
                                application.config.getJooqConfiguration(),
                                "migrations.xml"
                        )
                );

        if (application.config.isDevelopmentEnv()) {
            startupScheduler.registerStartupTask(
                    new DbUnitTask(
                            application.config.getJooqConfiguration(),
                            Application.class.getClassLoader(),
                            "dataset.xml",
                            "dataset.dtd"
                    )
            );
        }

        startupScheduler.start();

        new UndertowServer()
                .start(application, application.config);
    }
}
