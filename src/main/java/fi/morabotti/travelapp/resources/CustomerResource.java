package fi.morabotti.travelapp.resources;

import fi.morabotti.travelapp.models.api.EmailView;
import fi.morabotti.travelapp.models.db.CustomerMapping;
import fi.morabotti.travelapp.models.api.CustomerView;
import fi.morabotti.travelapp.repo.CustomerDao;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@Path("/customer")
@Produces(MediaType.APPLICATION_JSON)
public class CustomerResource {
    private final CustomerDao customerDao;

    @Inject
    public CustomerResource (CustomerDao customerDao) {
        this.customerDao = customerDao;
    }

    @GET
    public List<CustomerView> fetchCustomers() {
        return customerDao.fetchAll()
                .stream()
                .map(this::mappingToView)
                .collect(Collectors.toList());
    }

    @GET
    @Path("/{customerId}")
    public CustomerView fetchCustomer(
            @PathParam("customerId") long id
    ) {
        return customerDao.fetchById(id)
                .map(this::mappingToView)
                .orElseThrow(NotFoundException::new);
    }

    @POST
    public CustomerView createCustomer(
            CustomerView customerView
    ) {
        return customerDao.create(this.viewToMapping(customerView))
                .map(this::mappingToView)
                .orElseThrow(BadRequestException::new);
    }

    @PUT
    public CustomerView editCustomer(
            CustomerView customerView
    ) {
        return customerDao.edit(this.viewToMapping(customerView))
                .map(this::mappingToView)
                .orElseThrow(BadRequestException::new);
    }

    @DELETE
    @Path("/{customerId}")
    public Response deleteCustomer(
            @PathParam("customerId") long id
    ) {
        if (!customerDao.delete(id)) {
            throw new InternalServerErrorException("Could not delete customer");
        }

        return Response.ok().build();
    }

    @POST
    @Path("/validate")
    public Response validateEmail(
            EmailView emailView
    ) {
        if (!customerDao.validateEmail(emailView.email())) {
            return Response.ok(true).build();
        }
        return Response.ok(false).build();
    }

    private CustomerMapping viewToMapping (CustomerView customerView) {
        return CustomerMapping.builder()
                .setId(customerView.id() == null ? 0L : customerView.id())
                .setFirstName(customerView.firstName())
                .setLastName(customerView.lastName())
                .setAge(customerView.age())
                .setEmail(customerView.email())
                .build();
    }

    private CustomerView mappingToView (CustomerMapping customerMapping) {
        return CustomerView.builder()
                .setId(customerMapping.id())
                .setFirstName(customerMapping.firstName())
                .setLastName(customerMapping.lastName())
                .setAge(customerMapping.age())
                .setEmail(customerMapping.email())
                .setCreated(customerMapping.created().toString())
                .build();
    }
}
