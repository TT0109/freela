import { faker } from '@faker-js/faker/locale/pt_BR'

export function generateFakeConversations() {
  return [
    {
      name: faker.person.fullName(),
      lastMessage: "Vamos confirmar o horário da reunião?",
      time: "12:45",
      unread: 2,
      status: "delivered",
      isOnline: true,
      avatar: faker.image.avatar()
    },
    {
      name: faker.person.fullName(),
      lastMessage: "Obrigado pelas informações!",
      time: "11:20",
      unread: 0,
      status: "read",
      isOnline: false,
      avatar: faker.image.avatar()
    },
    {
      name: "Grupo Família",
      lastMessage: "Ana: Alguém vai no aniversário do vovô?",
      time: "Ontem",
      unread: 5,
      status: "delivered",
      isOnline: false,
      avatar: null
    },
    {
      name: faker.person.fullName(),
      lastMessage: "Os documentos foram enviados por email",
      time: "Ontem",
      unread: 0,
      status: "read",
      isOnline: true,
      avatar: faker.image.avatar()
    },
    {
      name: faker.person.fullName(),
      lastMessage: "Seu chamado #4587 foi resolvido",
      time: "23/04/2023",
      unread: 0,
      status: "read",
      isOnline: false,
      avatar: faker.image.avatar()
    },
    {
      name: faker.person.fullName(),
      lastMessage: "Viu aquela série nova? Muito boa!",
      time: "22/04/2023",
      unread: 0,
      status: "read",
      isOnline: false,
      avatar: faker.image.avatar()
    },
    {
      name: faker.person.fullName(),
      lastMessage: "Sua consulta está confirmada",
      time: "20/04/2023",
      unread: 0,
      status: "read",
      isOnline: false,
      avatar: faker.image.avatar()
    }
  ]
}

export function generateFakeMessages(targetNumber: string, contactName: string) {
  const cleanNumber = targetNumber.replace(/\D/g, '')
  const seed = parseInt(cleanNumber.substring(6, 10)) || 1234
  
  const casualMessages = [
    "Oi, tudo bem?",
    "Como você está?",
    "Vamos marcar algo para o final de semana?",
    "Você viu aquela notícia?",
    "O que achou daquele filme?",
    "Preciso te contar uma coisa",
    "Obrigado por ontem",
    "Estou com saudades",
    "Consegui resolver aquele problema",
    "Pode me ajudar com uma coisa?"
  ]
  
  const businessMessages = [
    "Podemos remarcar a reunião?",
    "O documento está pronto para revisão",
    "Os valores foram atualizados conforme solicitado",
    "Confirma sua presença amanhã?",
    "O cliente aprovou a proposta",
    "Precisamos discutir o novo projeto",
    "Enviei o relatório por email",
    "Qual o prazo para entrega?",
    "A equipe está alinhada com as mudanças",
    "Conseguiu resolver com o departamento financeiro?"
  ]
  
  const responsesMessages = [
    "Claro, sem problemas",
    "Vou verificar e te aviso",
    "Entendi, obrigado",
    "Perfeito!",
    "Não consegui ainda, vou tentar novamente",
    "Sim, podemos resolver isso",
    "Combinado então",
    "Vou estar disponível amanhã",
    "Prefiro conversarmos pessoalmente",
    "Já resolvi aquela questão"
  ]
  
  const isBusiness = (seed % 3 === 0)
  const messagePool = isBusiness ? businessMessages : casualMessages
  
  const messageCount = 5 + (seed % 10)
  const messages: any[] = []
  let currentDate = new Date()
  
  currentDate.setHours(9 + (seed % 8))
  currentDate.setMinutes((seed % 50))
  
  for (let i = 0; i < messageCount; i++) {
    currentDate = new Date(currentDate.getTime() + (1 + (i * seed) % 10) * 60000)
    const timeStr = currentDate.getHours().toString().padStart(2, '0') + ':' + 
                    currentDate.getMinutes().toString().padStart(2, '0')
    
    const isFromTarget = (i % 2 === 0)
    const messageIndex = (seed + i) % (isFromTarget ? messagePool.length : responsesMessages.length)
    const text = isFromTarget ? messagePool[messageIndex] : responsesMessages[messageIndex]
    
    let status: 'read' | 'delivered' | 'sent' | any = undefined
    if (!isFromTarget) {
      if (i < messageCount - 2) {
        status = 'read'
      } else if (i < messageCount - 1) {
        status = 'delivered'
      } else {
        status = 'sent'
      }
    }
    
    //@eslint-ignore-next-line
    messages.push({
      id: `msg-${seed}-${i}`,
      text,
      time: timeStr,
      isFromTarget,
      status
    })
  }
  
  return messages
}