import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

export class Connection {
    getName(): string{
        return null
    }
}

@Injectable()
export class PostgreSQLConnection extends Connection {
    getName(): string {
        return 'PostgreSQL'
    }
}

@Injectable()
export class MySQLConnection extends Connection{
    getName(): string {
        return 'MySQL'
    }
}

export function createConnection(configService: ConfigService): Connection{
    if(configService.get('DATABASE') === 'pg') {
        return new PostgreSQLConnection()
    }else{
        return new MySQLConnection()
    }
}