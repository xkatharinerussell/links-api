import request from 'supertest';
import isBefore from 'date-fns/isBefore';

import startServer from '../src/server.js';

const port = 8081;
let baseUrl;
let server;

beforeAll(async () => {
    // Start server before each all the tests
    server = await startServer();
    baseUrl = `http://localhost:${port}`;
})

afterAll(async () => {
    // Close server after all the tests
    server.close();
})

describe('Create Link', () => {
    let mockRequest;

    const mockClassicRequest = {
        "links": {
            "type": "classic",
            "attributes": {
                "title": "short title",
                "url": "another url"
            }
        }
    };

    const mockShowsRequest = {
        "links": {
          "type": "shows",
          "attributes": {
              "showList": [
                {
                    "date": "19 December 2021",
                    "venue": "Agganis Arena",
                    "status": "Sold Out",
                    "url": "lnktree.com"
                }
              ]
          }
        }
    };

    const mockMusicRequest = {
        "links": {
          "type": "music",
          "attributes": {
              "featured": {
                  "albumImage": "http://albumImage.com",
                  "songName": "This cool song",
                  "artistName": "Prince"
              },
              "musicLinks": [
                {
                    "title": "Spotify",
                    "icon": "spotify.png",
                    "url": "lnktree.com"
                }
            ]
            }
        }
    }

    beforeEach(() => {
        mockRequest = {};
    });

    it("Return 400 Invalid Request for Invalid Classic Link Request", async () => {
        // Assign
        mockRequest = {
            "links": {
                "type": "someTypeOfLink",
                "attributes": {
                    "title": "short title",
                    "url": "another url"
                }
            }
        };
        
        // Act
        const response = await request(baseUrl)
        .post('/user/123/link')
        .send(mockRequest);

        // Assert
        expect(response.statusCode).toBe(400);
    });

    it("Return 201 Created when Classic Link created with correct Attributes", async () => {
        // Assign
        mockRequest = mockClassicRequest;
        
        // Act
        const response = await request(baseUrl)
        .post('/user/123/link')
        .send(mockRequest);
        // Assert
        expect(response.statusCode).toBe(201);
    });

    it("Return 201 Created when Shows List created with correct Attributes", async () => {
        // Assign
        mockRequest = mockShowsRequest;
        
        // Act
        const response = await request(baseUrl)
        .post('/user/123/link')
        .send(mockRequest);
        // Assert
        expect(response.statusCode).toBe(201);
    });

    it("Return 201 Created when Music Player created with correct attributes", async () => {
        // Assign
        mockRequest = mockMusicRequest;
        
        // Act
        const response = await request(baseUrl)
        .post('/user/123/link')
        .send(mockRequest);
        // Assert
        expect(response.statusCode).toBe(201);
    });

    it("Return 200 Found Links", async () => {

        const response = await request(baseUrl)
        .get('/user/123/links');

        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.links.length).toBe(3);
    });

    it("Return 200 Found Links with sorted dates", async () => {

        const response = await request(baseUrl)
        .get('/user/123/links?sortBy=createdAt&orderBy=DESC');

        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.links.length).toBe(3);
        expect(isBefore(new Date(response.body.links[1].createdAt), new Date(response.body.links[0].createdAt))).toBeTruthy();
    });
})