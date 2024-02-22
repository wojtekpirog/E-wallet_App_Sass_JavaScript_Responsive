pm.test("Status code is 200", () => {
	pm.response.to.have.status(200);
});

pm.test("Status code should be `OK`", () => {
	pm.expect(pm.response.status).to.eql("OK");
});

console.log(pm.response);
const response = pm.response.json();
console.log(response);

const avBooks = response.filter(book => book.available === true);
const fictionBooks = response.filter(book => book.type === "fiction");