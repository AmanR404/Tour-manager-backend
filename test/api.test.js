const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp)

describe('API Endpoint Testing', () => {
  it('GET /tour should return 200', (done) => {
    chai.request('https://tour-manager-backend.vercel.app')
      .get('/tour')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('POST /tour should return 200', (done) => {
    const payload = { "tour_id": 2134 };
    chai.request('https://tour-manager-backend.vercel.app')
      .post('/tour')
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});