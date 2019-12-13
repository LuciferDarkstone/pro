import * as _mongoose from 'mongoose';
import * as _mongoosePaginate from 'mongoose-paginate';
import * as _mongooseAutoIncrement from 'mongoose-auto-increment';
import { APP } from 'src/config/constant';

_mongoose.set('useFindAndModify', false);
(_mongoose as any).Promise = global.Promise;

_mongooseAutoIncrement.initialize(_mongoose.connection);

(_mongoosePaginate as any).paginate.options = {
    limit: APP.LIMIT,
};

export const mongoose = _mongoose;
export const mongoosePaginate = _mongoosePaginate;
export const mongooseAutoIncrement = _mongooseAutoIncrement;
export default mongoose;
