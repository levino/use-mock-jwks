import { assert } from "chai";
import { createApp } from "./index";
import createJWKSMock from "mock-jwks";
import request from "supertest";

describe("Test API auth", () => {
  test("Api auth", async () => {
    const jwksMock = createJWKSMock("https://my-authz-server/");
    const app = createApp({
      jwksUri: "https://my-authz-server/.well-known/jwks.json",
    });

    const accessToken = jwksMock.token({
      aud: "urn:my-resource-server",
      iss: "https://my-authz-server/",
    });

    jwksMock.start();
    const response = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${accessToken}`);
    assert.equal(response.status, 200);
    await jwksMock.stop();
  });
});
