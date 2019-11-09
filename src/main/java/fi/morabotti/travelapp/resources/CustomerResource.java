package fi.morabotti.travelapp.resources;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/customer")
@Produces(MediaType.APPLICATION_JSON)
public class CustomerResource {

    @Inject
    public CustomerResource () {}

    @GET
    public Response fetchTransfers() {
        return Response.ok().build();
    }
}
