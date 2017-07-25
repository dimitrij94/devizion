package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DevizionApp;

import com.mycompany.myapp.domain.Custumer;
import com.mycompany.myapp.repository.CustumerRepository;
import com.mycompany.myapp.service.CustumerService;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CustumerResource REST controller.
 *
 * @see CustumerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DevizionApp.class)
public class CustumerResourceIntTest {

    private static final String DEFAULT_CUSTUMER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CUSTUMER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CUSTUMER_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_CUSTUMER_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_CUSTUMER_CONTACT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_CUSTUMER_CONTACT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_CUSTUMER_IMAGE_URI = "AAAAAAAAAA";
    private static final String UPDATED_CUSTUMER_IMAGE_URI = "BBBBBBBBBB";

    @Autowired
    private CustumerRepository custumerRepository;

    @Autowired
    private CustumerService custumerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCustumerMockMvc;

    private Custumer custumer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CustumerResource custumerResource = new CustumerResource(custumerService);
        this.restCustumerMockMvc = MockMvcBuilders.standaloneSetup(custumerResource)
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
    public static Custumer createEntity(EntityManager em) {
        Custumer custumer = new Custumer()
            .custumerName(DEFAULT_CUSTUMER_NAME)
            .custumerSurname(DEFAULT_CUSTUMER_SURNAME)
            .custumerContactNumber(DEFAULT_CUSTUMER_CONTACT_NUMBER)
            .custumerImageUri(DEFAULT_CUSTUMER_IMAGE_URI);
        return custumer;
    }

    @Before
    public void initTest() {
        custumer = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustumer() throws Exception {
        int databaseSizeBeforeCreate = custumerRepository.findAll().size();

        // Create the Custumer
        restCustumerMockMvc.perform(post("/api/custumers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(custumer)))
            .andExpect(status().isCreated());

        // Validate the Custumer in the database
        List<Custumer> custumerList = custumerRepository.findAll();
        assertThat(custumerList).hasSize(databaseSizeBeforeCreate + 1);
        Custumer testCustumer = custumerList.get(custumerList.size() - 1);
        assertThat(testCustumer.getCustumerName()).isEqualTo(DEFAULT_CUSTUMER_NAME);
        assertThat(testCustumer.getCustumerSurname()).isEqualTo(DEFAULT_CUSTUMER_SURNAME);
        assertThat(testCustumer.getCustumerContactNumber()).isEqualTo(DEFAULT_CUSTUMER_CONTACT_NUMBER);
        assertThat(testCustumer.getCustumerImageUri()).isEqualTo(DEFAULT_CUSTUMER_IMAGE_URI);
    }

    @Test
    @Transactional
    public void createCustumerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = custumerRepository.findAll().size();

        // Create the Custumer with an existing ID
        custumer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustumerMockMvc.perform(post("/api/custumers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(custumer)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Custumer> custumerList = custumerRepository.findAll();
        assertThat(custumerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCustumerNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = custumerRepository.findAll().size();
        // set the field null
        custumer.setCustumerName(null);

        // Create the Custumer, which fails.

        restCustumerMockMvc.perform(post("/api/custumers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(custumer)))
            .andExpect(status().isBadRequest());

        List<Custumer> custumerList = custumerRepository.findAll();
        assertThat(custumerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCustumerSurnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = custumerRepository.findAll().size();
        // set the field null
        custumer.setCustumerSurname(null);

        // Create the Custumer, which fails.

        restCustumerMockMvc.perform(post("/api/custumers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(custumer)))
            .andExpect(status().isBadRequest());

        List<Custumer> custumerList = custumerRepository.findAll();
        assertThat(custumerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCustumers() throws Exception {
        // Initialize the database
        custumerRepository.saveAndFlush(custumer);

        // Get all the custumerList
        restCustumerMockMvc.perform(get("/api/custumers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(custumer.getId().intValue())))
            .andExpect(jsonPath("$.[*].custumerName").value(hasItem(DEFAULT_CUSTUMER_NAME.toString())))
            .andExpect(jsonPath("$.[*].custumerSurname").value(hasItem(DEFAULT_CUSTUMER_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].custumerContactNumber").value(hasItem(DEFAULT_CUSTUMER_CONTACT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].custumerImageUri").value(hasItem(DEFAULT_CUSTUMER_IMAGE_URI.toString())));
    }

    @Test
    @Transactional
    public void getCustumer() throws Exception {
        // Initialize the database
        custumerRepository.saveAndFlush(custumer);

        // Get the custumer
        restCustumerMockMvc.perform(get("/api/custumers/{id}", custumer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(custumer.getId().intValue()))
            .andExpect(jsonPath("$.custumerName").value(DEFAULT_CUSTUMER_NAME.toString()))
            .andExpect(jsonPath("$.custumerSurname").value(DEFAULT_CUSTUMER_SURNAME.toString()))
            .andExpect(jsonPath("$.custumerContactNumber").value(DEFAULT_CUSTUMER_CONTACT_NUMBER.toString()))
            .andExpect(jsonPath("$.custumerImageUri").value(DEFAULT_CUSTUMER_IMAGE_URI.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCustumer() throws Exception {
        // Get the custumer
        restCustumerMockMvc.perform(get("/api/custumers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustumer() throws Exception {
        // Initialize the database
        custumerService.save(custumer);

        int databaseSizeBeforeUpdate = custumerRepository.findAll().size();

        // Update the custumer
        Custumer updatedCustumer = custumerRepository.findOne(custumer.getId());
        updatedCustumer
            .custumerName(UPDATED_CUSTUMER_NAME)
            .custumerSurname(UPDATED_CUSTUMER_SURNAME)
            .custumerContactNumber(UPDATED_CUSTUMER_CONTACT_NUMBER)
            .custumerImageUri(UPDATED_CUSTUMER_IMAGE_URI);

        restCustumerMockMvc.perform(put("/api/custumers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustumer)))
            .andExpect(status().isOk());

        // Validate the Custumer in the database
        List<Custumer> custumerList = custumerRepository.findAll();
        assertThat(custumerList).hasSize(databaseSizeBeforeUpdate);
        Custumer testCustumer = custumerList.get(custumerList.size() - 1);
        assertThat(testCustumer.getCustumerName()).isEqualTo(UPDATED_CUSTUMER_NAME);
        assertThat(testCustumer.getCustumerSurname()).isEqualTo(UPDATED_CUSTUMER_SURNAME);
        assertThat(testCustumer.getCustumerContactNumber()).isEqualTo(UPDATED_CUSTUMER_CONTACT_NUMBER);
        assertThat(testCustumer.getCustumerImageUri()).isEqualTo(UPDATED_CUSTUMER_IMAGE_URI);
    }

    @Test
    @Transactional
    public void updateNonExistingCustumer() throws Exception {
        int databaseSizeBeforeUpdate = custumerRepository.findAll().size();

        // Create the Custumer

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCustumerMockMvc.perform(put("/api/custumers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(custumer)))
            .andExpect(status().isCreated());

        // Validate the Custumer in the database
        List<Custumer> custumerList = custumerRepository.findAll();
        assertThat(custumerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCustumer() throws Exception {
        // Initialize the database
        custumerService.save(custumer);

        int databaseSizeBeforeDelete = custumerRepository.findAll().size();

        // Get the custumer
        restCustumerMockMvc.perform(delete("/api/custumers/{id}", custumer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Custumer> custumerList = custumerRepository.findAll();
        assertThat(custumerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Custumer.class);
    }
}
