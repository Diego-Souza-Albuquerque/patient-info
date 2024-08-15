'use client'
import { useState } from 'react'

export default function SendPatient() {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [sex, setSex] = useState('')
  const [lastVisits, setLastVisits] = useState<Date[]>([])
  const [format, setFormat] = useState('')
  const [response, setResponse] = useState('')

  const handleLastVisitsChange = (e: { target: { value: string } }) => {
    const visits = e.target.value.split(',').map((date: string) => {
      const [day, month, year] = date.trim().split('/').map(Number)
      return new Date(year, month - 1, day)
    })
    setLastVisits(visits)
  }

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const patientData = {
      name,
      birthDate,
      sex,
      lastVisits,
    }

    const body =
      format === 'json'
        ? JSON.stringify(patientData)
        : `
      <patient>
        <name>${name}</name>
        <birthDate>${birthDate}</birthDate>
        <sex>${sex}</sex>
        <lastVisits>${lastVisits.map((date) => `<visit>${date}</visit>`).join('')}</lastVisits>
      </patient>
    `
    try {
      const response = await fetch(
        'http://localhost:4000/api/createnewpatient',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              format === 'json' ? 'application/json' : 'application/xml',
          },
          body,
        },
      )

      if (response.status === 201) {
        setResponse('Paciente Cadastrado com sucesso')
      } else {
        setResponse('Verifique se esta faltando algum dado para preencher')
      }

      if (response.status === 500) {
        setResponse('Ocorreu um erro na hora do cadastro, tente mais tarde')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-screen h-full flex flex-col items-center justify-center py-20 ">
      <form className="flex gap-10" onSubmit={onSubmit}>
        <div>
          <div className="px-4 mx-auto w-86">
            <h1 className="text-2xl font-extrabold mb-4">
              Preencha todos os campos abaixo:
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Nome do paciente:
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Data de Nascimento:
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Sexo do paciente:
              </label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                required
              >
                <option value="">Selecione o sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Últimas Visitas (separadas por vírgula):
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                onChange={handleLastVisitsChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Selecione o formato que deseja enviar:
              </label>
              <div>
                <select
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  required
                >
                  <option value="">Selecione o formato</option>
                  <option value="xml">XML</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Formato a enviar */}
        <div className="flex flex-col items-center gap-4">
          {format === 'xml' && (
            <article className="border-[1px] rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2">
                Arquivo no formato XML:
              </h2>
              <section className="bg-gray-100 p-4 rounded-md">
                <pre>
                  <code>
                    {`<patient>`} <br />
                    {`  <name>${name}</name>`} <br />
                    {`  <birthDate>${birthDate}</birthDate>`} <br />
                    {`  <sex>${sex}</sex>`} <br />
                    {`  <lastVisits>`} <br />
                    {`    ${lastVisits.map((date) => `<visit>${date}</visit>`).join('\n    ')}`}{' '}
                    <br />
                    {`  </lastVisits>`} <br />
                    {`</patient>`}
                  </code>
                </pre>
              </section>
            </article>
          )}
          {format === 'json' && (
            <article className="border-[1px] rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2">JSON:</h2>
              <section className="bg-gray-100 p-4 rounded-md">
                <pre>
                  <code>
                    {`{`} <br />
                    {`  "name": "${name}",`} <br />
                    {`  "birthDate": "${birthDate}",`} <br />
                    {`  "sex": "${sex}",`} <br />
                    {`  "lastVisits": [`} <br />
                    {`    ${lastVisits.map((date) => `"${date}"`).join(',\n    ')}`}{' '}
                    <br />
                    {`  ]`} <br />
                    {`}`}
                  </code>
                </pre>
              </section>
            </article>
          )}
          {format !== '' && (
            <button
              className="bg-black hover:bg-black/80 text-white w-fit px-4 py-0.5 rounded-lg text-base"
              type="submit"
            >
              Enviar
            </button>
          )}

          <div className="w-max-xl">
            <pre className="w-full h-full">{response}</pre>
          </div>

          {response !== '' && (
            <button
              className="bg-black hover:bg-black/80 text-white w-fit px-4 py-0.5 rounded-lg text-base"
              onClick={() => {
                window.location.reload()
              }}
            >
              Cadastrar novo paciente
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
