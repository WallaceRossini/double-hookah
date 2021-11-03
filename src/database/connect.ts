import { Connection, ConnectionOptions, createConnection } from "typeorm";


export class PostgresConnector {

  private static postgres_connection: Connection;

  private url: string;
  private entities: string;

  constructor() {
    this.url = String(process.env.DATABASE_URL)
    this.entities = `${__dirname}/../${process.env.DATABASE_ENTITIES}`
  }

  get connection(): Connection {
    return PostgresConnector.postgres_connection;
  }

  public async connect() {


    const opts: ConnectionOptions = {
      type: 'postgres',
      url: this.url,
      ssl:{
        rejectUnauthorized: false
      },
      entities: [
        this.entities
      ]
    }


    
    const connection = await createConnection(opts);

    PostgresConnector.postgres_connection = connection

  }

  public async disconnect(): Promise<any> {
    return PostgresConnector.postgres_connection.close();
  }


}