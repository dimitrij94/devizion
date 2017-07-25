package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DevizionApp;

import com.mycompany.myapp.domain.ImageToken;
import com.mycompany.myapp.repository.ImageTokenRepository;
import com.mycompany.myapp.service.ImageTokenService;
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
 * Test class for the ImageTokenResource REST controller.
 *
 * @see ImageTokenResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DevizionApp.class)
public class ImageTokenResourceIntTest {

    private static final String DEFAULT_PATH = "AAAAAAAAAA";
    private static final String UPDATED_PATH = "BBBBBBBBBB";

    @Autowired
    private ImageTokenRepository imageTokenRepository;

    @Autowired
    private ImageTokenService imageTokenService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restImageTokenMockMvc;

    private ImageToken imageToken;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ImageTokenResource imageTokenResource = new ImageTokenResource(imageTokenService);
        this.restImageTokenMockMvc = MockMvcBuilders.standaloneSetup(imageTokenResource)
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
    public static ImageToken createEntity(EntityManager em) {
        ImageToken imageToken = new ImageToken()
            .path(DEFAULT_PATH);
        return imageToken;
    }

    @Before
    public void initTest() {
        imageToken = createEntity(em);
    }

    @Test
    @Transactional
    public void createImageToken() throws Exception {
        int databaseSizeBeforeCreate = imageTokenRepository.findAll().size();

        // Create the ImageToken
        restImageTokenMockMvc.perform(post("/api/image-tokens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imageToken)))
            .andExpect(status().isCreated());

        // Validate the ImageToken in the database
        List<ImageToken> imageTokenList = imageTokenRepository.findAll();
        assertThat(imageTokenList).hasSize(databaseSizeBeforeCreate + 1);
        ImageToken testImageToken = imageTokenList.get(imageTokenList.size() - 1);
        assertThat(testImageToken.getPath()).isEqualTo(DEFAULT_PATH);
    }

    @Test
    @Transactional
    public void createImageTokenWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imageTokenRepository.findAll().size();

        // Create the ImageToken with an existing ID
        imageToken.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImageTokenMockMvc.perform(post("/api/image-tokens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imageToken)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<ImageToken> imageTokenList = imageTokenRepository.findAll();
        assertThat(imageTokenList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPathIsRequired() throws Exception {
        int databaseSizeBeforeTest = imageTokenRepository.findAll().size();
        // set the field null
        imageToken.setPath(null);

        // Create the ImageToken, which fails.

        restImageTokenMockMvc.perform(post("/api/image-tokens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imageToken)))
            .andExpect(status().isBadRequest());

        List<ImageToken> imageTokenList = imageTokenRepository.findAll();
        assertThat(imageTokenList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllImageTokens() throws Exception {
        // Initialize the database
        imageTokenRepository.saveAndFlush(imageToken);

        // Get all the imageTokenList
        restImageTokenMockMvc.perform(get("/api/image-tokens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imageToken.getId().intValue())))
            .andExpect(jsonPath("$.[*].path").value(hasItem(DEFAULT_PATH.toString())));
    }

    @Test
    @Transactional
    public void getImageToken() throws Exception {
        // Initialize the database
        imageTokenRepository.saveAndFlush(imageToken);

        // Get the imageToken
        restImageTokenMockMvc.perform(get("/api/image-tokens/{id}", imageToken.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(imageToken.getId().intValue()))
            .andExpect(jsonPath("$.path").value(DEFAULT_PATH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingImageToken() throws Exception {
        // Get the imageToken
        restImageTokenMockMvc.perform(get("/api/image-tokens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImageToken() throws Exception {
        // Initialize the database
        imageTokenService.save(imageToken);

        int databaseSizeBeforeUpdate = imageTokenRepository.findAll().size();

        // Update the imageToken
        ImageToken updatedImageToken = imageTokenRepository.findOne(imageToken.getId());
        updatedImageToken
            .path(UPDATED_PATH);

        restImageTokenMockMvc.perform(put("/api/image-tokens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImageToken)))
            .andExpect(status().isOk());

        // Validate the ImageToken in the database
        List<ImageToken> imageTokenList = imageTokenRepository.findAll();
        assertThat(imageTokenList).hasSize(databaseSizeBeforeUpdate);
        ImageToken testImageToken = imageTokenList.get(imageTokenList.size() - 1);
        assertThat(testImageToken.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingImageToken() throws Exception {
        int databaseSizeBeforeUpdate = imageTokenRepository.findAll().size();

        // Create the ImageToken

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restImageTokenMockMvc.perform(put("/api/image-tokens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imageToken)))
            .andExpect(status().isCreated());

        // Validate the ImageToken in the database
        List<ImageToken> imageTokenList = imageTokenRepository.findAll();
        assertThat(imageTokenList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteImageToken() throws Exception {
        // Initialize the database
        imageTokenService.save(imageToken);

        int databaseSizeBeforeDelete = imageTokenRepository.findAll().size();

        // Get the imageToken
        restImageTokenMockMvc.perform(delete("/api/image-tokens/{id}", imageToken.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ImageToken> imageTokenList = imageTokenRepository.findAll();
        assertThat(imageTokenList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImageToken.class);
    }
}
