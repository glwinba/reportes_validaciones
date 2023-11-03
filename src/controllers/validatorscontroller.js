import Validador from "../database/models/Validador.js"

export async function getValidators() {
  const data = await Validador.findAll();
  return data
}
