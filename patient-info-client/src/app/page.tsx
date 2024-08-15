import Link from 'next/link'

export default function Component() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24">
      <div className="max-w-2xl text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
          Gerencie seus pacientes com facilidade
        </h1>
        <p className="text-muted-foreground md:text-base">
          Veja todos pacientes cadastrados na plataforma ou adicione mais
          pacientes, os dados serão enviados nos formatos XML ou JSON
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/newpatient"
            className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium bg-black hover:bg-black/80 text-white"
            prefetch={false}
          >
            Cadastrar Paciente
          </Link>
          <Link
            href="/allpatients"
            className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium border bg-white hover:bg-gray-100 text-black "
            prefetch={false}
          >
            Ver Pacientes
          </Link>
        </div>
      </div>
    </main>
  )
}
