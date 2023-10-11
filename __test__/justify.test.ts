import request from 'supertest';


const authMiddleware = require('../src/middleware/auth')
describe('POST /justify', () => {
    const app = require("../src/index")
    let token: string
    beforeAll(async () => {
        const mail = "test@mail.com"
        token = await authMiddleware.PostToken(mail)
    })

    it('should return 401 if no text is provided', async () => {
        const res = await request(app).post('/api/justify').set('token', token)
        expect(res.status).toBe(401);
        expect(res.text).toBe('Bad request: No text in body');
    });

    it('should return justified text', async () => {
        const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.';
        const res = await request(app).post('/api/justify')
            .send(text)
            .set('Content-type', 'text/plain')
            .set('token', token);
        expect(res.status).toBe(200);
        expect(res.text).toBe('Lorem  ipsum  dolor  sit  amet,  consectetur  adipiscing  elit.  Sed  non risus.\nSuspendisse  lectus  tortor,  dignissim sit amet, adipiscing nec, ultricies sed,\ndolor.');
    });

    it('should return 401', async () => {
        const res = await request(app).post('/api/justify')
            .send("foo")
            .set('Content-type', 'text/plain')
        expect(res.status).toBe(401)
    })
});
