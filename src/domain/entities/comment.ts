export default class Comment {
  constructor(
    readonly establishmentId: string,
    readonly userId: string,
    readonly id: string,
    readonly text: string
  ) {}
}
