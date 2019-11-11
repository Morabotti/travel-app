package fi.morabotti.travelapp.resources;

import fi.morabotti.travelapp.models.db.CustomerMapping;
import fi.morabotti.travelapp.repo.CustomerDao;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/customer")
@Produces(MediaType.APPLICATION_JSON)
public class CustomerResource {
    private final CustomerDao customerDao;

    @Inject
    public CustomerResource (CustomerDao customerDao) {
        this.customerDao = customerDao;
    }

    @GET
    public List<CustomerMapping> fetchCustomers() {
        return customerDao.fetchAll();
    }
}
