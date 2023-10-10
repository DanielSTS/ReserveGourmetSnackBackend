export type UserDto = {
  id: string;
  name: string;
  phone: string;
};

export default interface UserDao {
  getById(id: string): Promise<UserDto>;
}
