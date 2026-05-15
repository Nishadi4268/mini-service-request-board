const request = require('supertest');
const app = require('../app');
const JobRequest = require('../models/JobRequest');

jest.mock('../models/JobRequest');

describe('Auth and Job API', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'test_secret';
    process.env.AUTH_EMAIL = 'admin@globaltna.com';
    process.env.AUTH_PASSWORD = 'Admin@123';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('POST /api/auth/login returns token for valid credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'admin@globaltna.com',
      password: 'Admin@123'
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
  });

  it('POST /api/jobs returns 401 without token', async () => {
    const response = await request(app).post('/api/jobs').send({
      title: 'Need a plumber for sink leak',
      description: 'Sink is leaking and needs urgent repair by today.',
      category: 'Plumbing',
      location: 'Glasgow',
      contactName: 'John Doe',
      contactEmail: 'john@example.com'
    });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('GET /api/jobs returns job list', async () => {
    const selectMock = jest.fn().mockResolvedValue([
      {
        _id: '1',
        title: 'Need electrician',
        description: 'Fix a faulty switch in bedroom',
        status: 'Open'
      }
    ]);
    const sortMock = jest.fn().mockReturnValue({ select: selectMock });

    JobRequest.find.mockReturnValue({ sort: sortMock });

    const response = await request(app).get('/api/jobs');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toBe(1);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
