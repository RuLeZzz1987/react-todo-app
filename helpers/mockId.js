import uuid from "uuid";

jest.mock("uuid");

export default id => uuid.v4.mockImplementation(() => id);
