const PeepChitter = require("../model/peepModel.js");
const dotenv = require('dotenv');
dotenv.config()

const chai = require('chai');
const chaiHttp = require('chai-http')
const { expect } = require('chai')

const app = require('../app.js')
const testData = require('./data/data')
const testDataArray = testData.peeps


chai.use(chaiHttp);

describe(`Testing GET/POST requests on the database`, () => {
    const testServer = chai.request(app).keepOpen();

    beforeEach(async () => {
        try {
            await PeepChitter.deleteMany();
            console.log(`Database cleared`);
        } catch (error) {
            console.log(`Error clearing`);
            throw new Error();
        };
        try {
            await PeepChitter.insertMany(testDataArray);
            console.log(`Database populated with test Peeps`);
        } catch (error) {
            console.log(error);
            throw new Error();
        };
    });

    describe(`/GET peep`, () => {

        it(`should return peeps as an array`, async () => {
            const res = await testServer
                .get(`/`)
                .send();

            expect(res).to.have.status(200);
            expect(res.body).to.be.an(`array`);
            expect(res.body.length).to.equal(testDataArray.length);
        });
    });

    describe(`/POST create a todo`, () => {

        it(`should return error whe post a peep when you are not logged in`, async () => {
            let peep = {
                text: "",
                createdAt: `2019-05-27T00:00:00.000Z`,
                updatedAt: false
            };

            const res = await testServer
                .post(`/`)
                .send(peep);

            expect(res).to.have.status(401);
            expect(res).to.have.property(`error`);
            expect(res.body.error).to.be.eql(`no value for authorization`);
        });
    });


        it(`should not create peep when the field is empty`, async () => {
            let peep = {
                   text: ``,
                   createdAt: `not a date`,
            };
            const token = process.env.TEST_TOKEN

            const res = await testServer
                .post(`/`)
                .set('Authorization', `Bearer ${token}`)
                .send(peep);
            
            console.log(res)
            expect(res).to.have.status(400);
            expect(res).to.have.property(`error`);
            expect(res.body.error).to.be.eql(`please fill up the field`);
        });

    it(`should create peep when the text is filled up`, async () => {
        let peep = {
            text: `Hello text`
        };
        const token = process.env.TEST_TOKEN

        const res = await testServer
            .post(`/`)
            .set('Authorization', `Bearer ${token}`)
            .send(peep);

        console.log(res)
        expect(res).to.have.status(200);
        expect(res.body).to.be.an(`object`);
        expect(res.body.text).to.be.eql('Hello text');
    });

}); 