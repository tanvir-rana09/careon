export interface InternalRequisitionFormData {
  wareHouse: string;
  requestForId: string;
  requestForName: string;
  department: string;
  product: string;
  reqQty: number;
  amount: number;
  reqNo: string;
  reqDate: Date;
  dateLine: Date;
  daysPreviousTaken: number;
  daysCover: number;
  costPrice: number;
  currentStock: number;
  note: string;
}
