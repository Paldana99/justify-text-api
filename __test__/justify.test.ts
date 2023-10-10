import request from 'supertest';

const app = require("../src/index")
describe('POST /justify', () => {
    it('should return 401 if no text is provided', async () => {
        const res = await request(app).post('/api/justify');
        expect(res.status).toBe(401);
        expect(res.text).toBe('Bad request: No text in body');
    });

    it('should return justified text', async () => {
        const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.';
        const res = await request(app).post('/api/justify')
            .send(text)
            .set('Content-type', 'text/plain');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Lorem  ipsum  dolor  sit  amet,  consectetur  adipiscing  elit.  Sed  non risus.\nSuspendisse  lectus  tortor,  dignissim sit amet, adipiscing nec, ultricies sed,\ndolor.');
    });
});
