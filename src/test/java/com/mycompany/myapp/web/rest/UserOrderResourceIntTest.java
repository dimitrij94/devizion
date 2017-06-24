package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DevizionApp;

import com.mycompany.myapp.domain.UserOrder;
import com.mycompany.myapp.repository.UserOrderRepository;
import com.mycompany.myapp.service.UserOrderService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserOrderResource REST controller.
 *
 * @see UserOrderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DevizionApp.class)
public class UserOrderResourceIntTest {

    private static final String DEFAULT_PHOTO_URI = "AAAAAAAAAA";
    private static final String UPDATED_PHOTO_URI = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_ORDER_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_ORDER_NOTES = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_ORDERED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ORDERED_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private UserOrderRepository userOrderRepository;

    @Autowired
    private UserOrderService userOrderService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserOrderMockMvc;

    private UserOrder userOrder;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserOrderResource userOrderResource = new UserOrderResource(userOrderService);
        this.restUserOrderMockMvc = MockMvcBuilders.standaloneSetup(userOrderResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserOrder createEntity(EntityManager em) {
        UserOrder userOrder = new UserOrder()
            .photoUri(DEFAULT_PHOTO_URI)
            .description(DEFAULT_DESCRIPTION)
            .orderedAt(DEFAULT_ORDERED_AT);
        return userOrder;
    }

    @Before
    public void initTest() {
        userOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserOrder() throws Exception {
        int databaseSizeBeforeCreate = userOrderRepository.findAll().size();

        // Create the UserOrder
        restUserOrderMockMvc.perform(post("/api/user-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userOrder)))
            .andExpect(status().isCreated());

        // Validate the UserOrder in the database
        List<UserOrder> userOrderList = userOrderRepository.findAll();
        assertThat(userOrderList).hasSize(databaseSizeBeforeCreate + 1);
        UserOrder testUserOrder = userOrderList.get(userOrderList.size() - 1);
        assertThat(testUserOrder.getPhotoUri()).isEqualTo(DEFAULT_PHOTO_URI);
        assertThat(testUserOrder.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testUserOrder.getOrderedAt()).isEqualTo(DEFAULT_ORDERED_AT);
    }

    @Test
    @Transactional
    public void createUserOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userOrderRepository.findAll().size();

        // Create the UserOrder with an existing ID
        userOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserOrderMockMvc.perform(post("/api/user-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userOrder)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<UserOrder> userOrderList = userOrderRepository.findAll();
        assertThat(userOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserOrders() throws Exception {
        // Initialize the database
        userOrderRepository.saveAndFlush(userOrder);

        // Get all the userOrderList
        restUserOrderMockMvc.perform(get("/api/user-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].photoUri").value(hasItem(DEFAULT_PHOTO_URI.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].orderNotes").value(hasItem(DEFAULT_ORDER_NOTES.toString())))
            .andExpect(jsonPath("$.[*].orderedAt").value(hasItem(DEFAULT_ORDERED_AT.toString())));
    }

    @Test
    @Transactional
    public void getUserOrder() throws Exception {
        // Initialize the database
        userOrderRepository.saveAndFlush(userOrder);

        // Get the userOrder
        restUserOrderMockMvc.perform(get("/api/user-orders/{id}", userOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userOrder.getId().intValue()))
            .andExpect(jsonPath("$.photoUri").value(DEFAULT_PHOTO_URI.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.orderNotes").value(DEFAULT_ORDER_NOTES.toString()))
            .andExpect(jsonPath("$.orderedAt").value(DEFAULT_ORDERED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserOrder() throws Exception {
        // Get the userOrder
        restUserOrderMockMvc.perform(get("/api/user-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserOrder() throws Exception {
        // Initialize the database
        userOrderService.save(userOrder);

        int databaseSizeBeforeUpdate = userOrderRepository.findAll().size();

        // Update the userOrder
        UserOrder updatedUserOrder = userOrderRepository.findOne(userOrder.getId());
        updatedUserOrder
            .photoUri(UPDATED_PHOTO_URI)
            .description(UPDATED_DESCRIPTION)
            .orderedAt(UPDATED_ORDERED_AT);

        restUserOrderMockMvc.perform(put("/api/user-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserOrder)))
            .andExpect(status().isOk());

        // Validate the UserOrder in the database
        List<UserOrder> userOrderList = userOrderRepository.findAll();
        assertThat(userOrderList).hasSize(databaseSizeBeforeUpdate);
        UserOrder testUserOrder = userOrderList.get(userOrderList.size() - 1);
        assertThat(testUserOrder.getPhotoUri()).isEqualTo(UPDATED_PHOTO_URI);
        assertThat(testUserOrder.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingUserOrder() throws Exception {
        int databaseSizeBeforeUpdate = userOrderRepository.findAll().size();

        // Create the UserOrder

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserOrderMockMvc.perform(put("/api/user-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userOrder)))
            .andExpect(status().isCreated());

        // Validate the UserOrder in the database
        List<UserOrder> userOrderList = userOrderRepository.findAll();
        assertThat(userOrderList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserOrder() throws Exception {
        // Initialize the database
        userOrderService.save(userOrder);

        int databaseSizeBeforeDelete = userOrderRepository.findAll().size();

        // Get the userOrder
        restUserOrderMockMvc.perform(delete("/api/user-orders/{id}", userOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserOrder> userOrderList = userOrderRepository.findAll();
        assertThat(userOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserOrder.class);
    }
}
