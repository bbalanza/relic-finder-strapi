describe("Tests Relic Creation", () => {
    it("Creates a Relic successfully", async () => {
        await strapi.entityService.create('api::relic.relic', {
            data: {
                Title: "Test",
                Blocks: []
            }
        })
    })
})