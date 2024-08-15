'use client'
import { useEffect, useState } from 'react'

interface PatientType {
  email: string
  name: string
  birthDate: string
  sex: string
  visits: string[]
}

export default function Example() {
  const [allPatients, setAllPatients] = useState([])
  const [loading, setLoading] = useState(true)

  async function getPatients() {
    try {
      const response = await fetch(`http://localhost:4000/api/getAllPatients`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setAllPatients(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPatients()
  }, [])

  return (
    <>
      {loading ? (
        <>
          <div className="px-4 sm:px-6 lg:px-20 py-10 absolute top-20 w-full text-center">
            <h2 className="text-2xl font-extrabold">
              Carregando as informações...
            </h2>
          </div>
        </>
      ) : (
        <div className="px-4 sm:px-6 lg:px-20 py-10 absolute top-20 w-full">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-extrabold mb-4">
                Pacientes cadastrados
              </h1>
            </div>
          </div>
          <div className="mt-0 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Nome
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Data de nascimento
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Sexo
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Últimas visitas
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {allPatients?.map((patient: PatientType) => (
                      <tr key={patient?.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {patient?.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(patient?.birthDate).toLocaleDateString(
                            'pt-BR',
                            {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            },
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {patient?.sex}
                        </td>
                        <td className="whitespace-nowrap flex gap-2 px-3 py-4 text-sm text-gray-500">
                          {patient?.visits?.map((visit, index) => (
                            <div
                              className="text-sm font-semibold text-black rounded-lg bg-gray-100 px-2 py-1"
                              key={index}
                            >
                              {new Date(visit).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                              })}
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
