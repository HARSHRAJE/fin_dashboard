import { createObjectCsvWriter } from 'csv-writer';

export const generateCSV = async (data: any[], selectedFields: string[]) => {
  const writer = createObjectCsvWriter({
    path: 'export.csv',
    header: selectedFields.map(field => ({ id: field, title: field }))
  });
  await writer.writeRecords(data);
};


