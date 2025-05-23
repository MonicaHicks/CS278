import { DocumentReference } from 'firebase/firestore';

// Helper function for comparing document references
export const isDocumentReferenceInList = (
  targetRef: DocumentReference,
  refList: DocumentReference[],
): boolean => {
  return refList.some((ref) => ref.path === targetRef.path);
};
