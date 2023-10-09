import Email from "../src/domain/entities/email";

test("Deve criar uma instância de Email com endereço válido", () => {
    const validAddress = "exemplo@teste.com";
    const email = new Email(validAddress);
    expect(email).toBeDefined();
    expect(email).toBeInstanceOf(Email);
    expect(email.value).toBe(validAddress);
});

test("Deve lançar um erro ao criar uma instância de Email com endereço inválido", () => {
    const invalidAddress = "email.invalido";
    expect(() => new Email(invalidAddress)).toThrow("Invalid email.");
});

test("Deve lançar um erro ao criar uma instância de Email com endereço vazio", () => {
    const emptyEmail = "";
    expect(() => new Email(emptyEmail)).toThrow("Empty email.");
});

