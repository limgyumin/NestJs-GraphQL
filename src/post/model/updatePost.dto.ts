import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePostDTO } from './createPost.dto';

@InputType()
export class UpdatePostDTO extends PartialType(CreatePostDTO) {}
