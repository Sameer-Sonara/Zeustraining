import { Edit } from './Edit.js'
import { resizeCol } from './Resize.js'
import { resizeRow } from './Resize.js'
export class Command {
    /**
     * Executes the command.
     */
    execute() { }
    /**
     * Undoes the command.
     */
    undo() { }
}