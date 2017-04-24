package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DevizionApp;

import com.mycompany.myapp.domain.PortfolioEntry;
import com.mycompany.myapp.repository.PortfolioEntryRepository;
import com.mycompany.myapp.service.PortfolioEntryService;
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
 * Test class for the PortfolioEntryResource REST controller.
 *
 * @see PortfolioEntryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DevizionApp.class)
public class PortfolioEntryResourceIntTest {

    private static final String DEFAULT_PHOTO_URI = "AAAAAAAAAA";
    private static final String UPDATED_PHOTO_URI = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private PortfolioEntryRepository portfolioEntryRepository;

    @Autowired
    private PortfolioEntryService portfolioEntryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPortfolioEntryMockMvc;

    private PortfolioEntry portfolioEntry;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PortfolioEntryResource portfolioEntryResource = new PortfolioEntryResource(portfolioEntryService);
        this.restPortfolioEntryMockMvc = MockMvcBuilders.standaloneSetup(portfolioEntryResource)
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
    public static PortfolioEntry createEntity(EntityManager em) {
        PortfolioEntry portfolioEntry = new PortfolioEntry()
            .photoUri(DEFAULT_PHOTO_URI)
            .description(DEFAULT_DESCRIPTION);
        return portfolioEntry;
    }

    @Before
    public void initTest() {
        portfolioEntry = createEntity(em);
    }

    @Test
    @Transactional
    public void createPortfolioEntry() throws Exception {
        int databaseSizeBeforeCreate = portfolioEntryRepository.findAll().size();

        // Create the PortfolioEntry
        restPortfolioEntryMockMvc.perform(post("/api/portfolio-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(portfolioEntry)))
            .andExpect(status().isCreated());

        // Validate the PortfolioEntry in the database
        List<PortfolioEntry> portfolioEntryList = portfolioEntryRepository.findAll();
        assertThat(portfolioEntryList).hasSize(databaseSizeBeforeCreate + 1);
        PortfolioEntry testPortfolioEntry = portfolioEntryList.get(portfolioEntryList.size() - 1);
        assertThat(testPortfolioEntry.getPhotoUri()).isEqualTo(DEFAULT_PHOTO_URI);
        assertThat(testPortfolioEntry.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createPortfolioEntryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = portfolioEntryRepository.findAll().size();

        // Create the PortfolioEntry with an existing ID
        portfolioEntry.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPortfolioEntryMockMvc.perform(post("/api/portfolio-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(portfolioEntry)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<PortfolioEntry> portfolioEntryList = portfolioEntryRepository.findAll();
        assertThat(portfolioEntryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPortfolioEntries() throws Exception {
        // Initialize the database
        portfolioEntryRepository.saveAndFlush(portfolioEntry);

        // Get all the portfolioEntryList
        restPortfolioEntryMockMvc.perform(get("/api/portfolio-entries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(portfolioEntry.getId().intValue())))
            .andExpect(jsonPath("$.[*].photoUri").value(hasItem(DEFAULT_PHOTO_URI.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getPortfolioEntry() throws Exception {
        // Initialize the database
        portfolioEntryRepository.saveAndFlush(portfolioEntry);

        // Get the portfolioEntry
        restPortfolioEntryMockMvc.perform(get("/api/portfolio-entries/{id}", portfolioEntry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(portfolioEntry.getId().intValue()))
            .andExpect(jsonPath("$.photoUri").value(DEFAULT_PHOTO_URI.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPortfolioEntry() throws Exception {
        // Get the portfolioEntry
        restPortfolioEntryMockMvc.perform(get("/api/portfolio-entries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePortfolioEntry() throws Exception {
        // Initialize the database
        portfolioEntryService.save(portfolioEntry);

        int databaseSizeBeforeUpdate = portfolioEntryRepository.findAll().size();

        // Update the portfolioEntry
        PortfolioEntry updatedPortfolioEntry = portfolioEntryRepository.findOne(portfolioEntry.getId());
        updatedPortfolioEntry
            .photoUri(UPDATED_PHOTO_URI)
            .description(UPDATED_DESCRIPTION);

        restPortfolioEntryMockMvc.perform(put("/api/portfolio-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPortfolioEntry)))
            .andExpect(status().isOk());

        // Validate the PortfolioEntry in the database
        List<PortfolioEntry> portfolioEntryList = portfolioEntryRepository.findAll();
        assertThat(portfolioEntryList).hasSize(databaseSizeBeforeUpdate);
        PortfolioEntry testPortfolioEntry = portfolioEntryList.get(portfolioEntryList.size() - 1);
        assertThat(testPortfolioEntry.getPhotoUri()).isEqualTo(UPDATED_PHOTO_URI);
        assertThat(testPortfolioEntry.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingPortfolioEntry() throws Exception {
        int databaseSizeBeforeUpdate = portfolioEntryRepository.findAll().size();

        // Create the PortfolioEntry

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPortfolioEntryMockMvc.perform(put("/api/portfolio-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(portfolioEntry)))
            .andExpect(status().isCreated());

        // Validate the PortfolioEntry in the database
        List<PortfolioEntry> portfolioEntryList = portfolioEntryRepository.findAll();
        assertThat(portfolioEntryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePortfolioEntry() throws Exception {
        // Initialize the database
        portfolioEntryService.save(portfolioEntry);

        int databaseSizeBeforeDelete = portfolioEntryRepository.findAll().size();

        // Get the portfolioEntry
        restPortfolioEntryMockMvc.perform(delete("/api/portfolio-entries/{id}", portfolioEntry.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PortfolioEntry> portfolioEntryList = portfolioEntryRepository.findAll();
        assertThat(portfolioEntryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PortfolioEntry.class);
    }
}
