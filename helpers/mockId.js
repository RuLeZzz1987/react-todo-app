jest.mock('uuid');

import uuid from 'uuid';

export const mockId = id => uuid.v4.mockImplementation(()=>id);