import { utilService } from './util.service.js'

interface EntityWithId {
  _id: string
}

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

function query<T extends EntityWithId>(entityType: string, delay: number = 300): Promise<T[]> {
  const storedData = localStorage.getItem(entityType);
  const entities: T[] = storedData ? JSON.parse(storedData) : []
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
}

async function get<T extends EntityWithId>(entityType: string, entityId: string): Promise<T> {
  const entities: T[] = await query<T>(entityType)
  const entity = entities.find((currEntity) => (currEntity._id === entityId))
  if (!entity)
    throw new Error(
      `Could not find entityId: [${entityId}], in collection: [${entityType}]`,
    )
  return entity
}

async function post<T extends EntityWithId>(entityType: string, newEntity: Omit<T, "_id">): Promise<T> {
  const entities = await query<T>(entityType);
  const entityToAdd = { ...newEntity, _id: utilService.makeId() } as T
  let newEntities;
  if (entities.length === 0) newEntities = [entityToAdd];
  else newEntities = [...entities, entityToAdd];
  _save(entityType, newEntities);
  return entityToAdd;
}

async function put<T extends EntityWithId>(entityType: string, newEntity: T): Promise<T> {
  const entities: T[] = await query<T>(entityType)
  const entityToUpdate: T = { ...newEntity }
  const idx = entities.findIndex((entity) => entity._id === entityToUpdate._id)
  if (idx === -1) {
    throw new Error(
      `Could not update entityId: [${newEntity._id}] in collection :[${entityType}]`,
    )
  }
  const newEntities = entities.map((originalEntity, i) =>
    i === idx ? entityToUpdate : originalEntity,
  )
  _save(entityType, newEntities)
  return entityToUpdate
}

async function remove<T extends EntityWithId>(entityType: string, entityId: string): Promise<string> {
  const entities = await query<T>(entityType)
  const idx = entities.findIndex((entity) => entity._id === entityId)
  if (idx === -1) {
    throw new Error(
      `Could not remove entityId: [${entityId}] from collection :[${entityType}]`,
    )
  }
  const newEntities = entities.filter((entity) => entity._id !== entityId)
  _save(entityType, newEntities)
  return entityId
}

function _save<T extends EntityWithId>(entityType: string, entities: T[]): void {
  localStorage.setItem(entityType, JSON.stringify(entities))
}
