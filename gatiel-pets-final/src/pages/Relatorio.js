// Painel gerencial que cruza dados de 3 coleções do Firestore (usuários, pets, adoções) 
// e exibe uma tabela com o histórico completo de adoções

// Importa os hooks useState (para gerenciar estado) e useEffect (para efeitos colaterais) do React
import { useState, useEffect } from 'react';

// Importa a instância do banco de dados Firebase configurada no projeto
import { db } from '../firebase';

// Importa funções do Firestore: 'collection' para referenciar coleções e 'getDocs' para buscar documentos
import { collection, getDocs } from 'firebase/firestore';

// Define e exporta o componente funcional chamado 'Relatorio'
function Relatorio() {

  // Estado que armazena a lista de adoções vindas do Firestore (começa vazia)
  const [adocoes, setAdocoes]   = useState([]);

  // Estado que armazena a lista de usuários cadastrados (começa vazia)
  const [usuarios, setUsuarios] = useState([]);

  // Estado que armazena a lista de pets cadastrados (começa vazia)
  const [pets, setPets]         = useState([]);

  // Estado booleano que controla se os dados ainda estão sendo carregados (começa como true)
  const [carregando, setCarregando] = useState(true);

  // useEffect executa a função ao montar o componente (array [] vazio = roda só uma vez)
  useEffect(() => {

    // Função assíncrona interna que busca os dados no Firestore
    async function carregarDados() {
      try {

        // Dispara as 3 buscas no Firestore AO MESMO TEMPO com Promise.all (mais eficiente que sequencial)
        // Cada 'getDocs(collection(...))' busca todos os documentos de uma coleção
        const [snapUsuarios, snapPets, snapAdocoes] = await Promise.all([
          getDocs(collection(db, 'usuarios')),  // Busca todos os usuários
          getDocs(collection(db, 'pets')),       // Busca todos os pets
          getDocs(collection(db, 'adocoes')),    // Busca todas as adoções
        ]);

        // Converte o snapshot de usuários em um array de objetos simples
        // d.id = ID do documento no Firestore | ...d.data() = todos os campos do documento
        setUsuarios(snapUsuarios.docs.map(d => ({ id: d.id, ...d.data() })));

        // Mesma conversão para pets
        setPets(snapPets.docs.map(d => ({ id: d.id, ...d.data() })));

        // Mesma conversão para adoções
        setAdocoes(snapAdocoes.docs.map(d => ({ id: d.id, ...d.data() })));

      } catch (erro) {
        // Se qualquer busca falhar, exibe o erro no console sem quebrar a aplicação
        console.error("Erro ao carregar relatório:", erro);

      } finally {
        // Independente de sucesso ou erro, marca o carregamento como concluído
        setCarregando(false);
      }
    }

    // Chama a função assíncrona definida acima
    carregarDados();

  }, []); // Dependências vazias = executa apenas na montagem do componente

  // ── JOIN em memória ──────────────────────────────────────────────────────────
  // Como o Firestore não faz JOINs nativos, fazemos manualmente aqui no JavaScript
  // Para cada adoção, buscamos os dados completos do usuário e do pet correspondentes
  const dadosRelatorio = adocoes.map(adocao => {

    // Procura no array de usuários aquele cujo id bate com o usuarioId da adoção
    const usuario = usuarios.find(u => u.id === adocao.usuarioId);

    // Procura no array de pets aquele cujo id bate com o petId da adoção
    const pet = pets.find(p => p.id === adocao.petId);
    
    // Retorna um objeto "enriquecido" com os dados combinados de adoção + usuário + pet
    return {
      id: adocao.id,                                          // ID da adoção

      // Se o usuário foi encontrado usa o nome dele, senão exibe mensagem padrão
      usuarioNome:  usuario ? usuario.nome  : 'Usuário Removido',

      // Se o usuário foi encontrado usa o e-mail dele, senão exibe traço
      usuarioEmail: usuario ? usuario.email : '—',

      // Se o pet foi encontrado usa o nome dele, senão exibe mensagem padrão
      petNome:    pet ? pet.nome    : 'Pet Removido',

      // Se o pet foi encontrado usa a espécie dele, senão exibe traço
      petEspecie: pet ? pet.especie : '—',

      dataAdocao: adocao.dataAdocao,  // Data da adoção (string no formato YYYY-MM-DD)
      status:     adocao.status       // Status atual da adoção (ex: 'Aprovada', 'Cancelada'...)
    };
  });

  // Se ainda estiver carregando, exibe um spinner centralizado na tela (Bootstrap)
  if (carregando) {
    return <div className="text-center mt-5"><div className="spinner-border text-warning"></div></div>;
  }

  // ── Renderização principal ────────────────────────────────────────────────
  return (
    // Card com padding e sombra leve como container visual
    <div className="card p-4 shadow-sm">

      {/* Título do relatório */}
      <h2 className="mb-4">📊 Relatório Gerencial de Adoções </h2>
      
      {/* Exibe mensagem alternativa se não houver nenhuma adoção cadastrada */}
      {dadosRelatorio.length === 0 ? (
        <p className="text-muted">Nenhuma adoção realizada até o momento.</p>
      ) : (

        // Wrapper que adiciona scroll horizontal em telas pequenas
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">

            {/* Cabeçalho da tabela com fundo escuro */}
            <thead className="table-dark">
              <tr>
                <th>Adotante (Usuário)</th>
                <th>E-mail do Adotante</th>
                <th>Animal (Pet)</th>
                <th>Espécie</th>
                <th>Data da Adoção</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {/* Itera sobre os dados combinados e gera uma linha <tr> por adoção */}
              {dadosRelatorio.map(item => (
                // 'key' único é obrigatório em listas React para otimizar a renderização
                <tr key={item.id}>

                  {/* Nome do adotante em negrito */}
                  <td><strong>{item.usuarioNome}</strong></td>

                  {/* E-mail do adotante */}
                  <td>{item.usuarioEmail}</td>

                  {/* Nome do pet */}
                  <td>{item.petNome}</td>

                  {/* Espécie do pet */}
                  <td>{item.petEspecie}</td>

                  {/* Data formatada para pt-BR (dd/mm/aaaa); o 'T00:00:00' evita problema de fuso horário */}
                  <td>{item.dataAdocao ? new Date(item.dataAdocao + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}</td>

                  <td>
                    {/* Badge colorido conforme o status da adoção */}
                    <span className={`badge ${
                      item.status === 'Aprovada'  ? 'bg-success'           : // Verde
                      item.status === 'Cancelada' ? 'bg-danger'            : // Vermelho
                      item.status === 'Concluída' ? 'bg-secondary'         : // Cinza
                      'bg-warning text-dark'                                  // Amarelo (Pendente ou outros)
                    }`}>
                      {item.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Exporta o componente para ser usado em outras partes da aplicação
export default Relatorio;