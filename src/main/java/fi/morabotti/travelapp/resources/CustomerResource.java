package fi.morabotti.travelapp.resources;

import fi.morabotti.travelapp.models.CustomerView;
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

    @GET
    @Path("/{customerId}")
    public CustomerMapping fetchCustomer(
            @PathParam("customerId") long id
    ) {
        return customerDao.fetchById(id)
                .orElseThrow(NotFoundException::new);
    }

    @POST
    public CustomerMapping createCustomer(
            CustomerView customerView
    ) {
        return customerDao.create(CustomerMapping.builder()
                .setId(0L)
                .setFirstName(customerView.firstName())
                .setLastName(customerView.lastName())
                .setAge(customerView.age())
                .setEmail(customerView.email())
                .setCreated("")
                .build()
        ).orElseThrow(BadRequestException::new);
    }

    @PUT
    public CustomerMapping editCustomer(
            CustomerMapping customerMapping
    ) {
        return customerDao.edit(customerMapping)
                .orElseThrow(BadRequestException::new);
    }

    @DELETE
    @Path("/{customerId}")
    public Response deleteCustomer(
            @PathParam("customerId") long id
    ) {
        if (!customerDao.delete(id, true)) {
            throw new InternalServerErrorException("Could not delete customer");
        }

        return Response.ok().build();
    }
}
