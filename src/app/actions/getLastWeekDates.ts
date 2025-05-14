// actions/getLastWeekDates.ts

import moment from 'moment'

export async function getLastWeekDates() {
  const inicio = moment().subtract(1, 'week').startOf('week').format('DD/MM');
  const fim = moment().subtract(1, 'week').endOf('week').format('DD/MM');

  return { inicio, fim };
}
