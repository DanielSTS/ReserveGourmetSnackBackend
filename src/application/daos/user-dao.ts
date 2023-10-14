export type UserDto = {
  id: string;
  name: string;
  phone: string;
};

export type OwnerDto = {
  id: string;
  name: string;
};

export default interface UserDao {
  getById(id: string): Promise<UserDto>;
  getOwnerById(id: string): Promise<OwnerDto>;
}
