import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers:[BookService]
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be get sample', ()=>{
    const response = controller.get()
    expect(response).toBe('GET SAMPLE')
  })

  it('should filter books by name and status', () => {
    const response = controller.getFilter('Test Book', 'Available');
    expect(response).toEqual({
      "book-name": "Test Book",
      "status": "Available"
    });
  });

  it('should be say hello', async ()=>{
    const response = await controller.SayHello('Joko')
    expect(response).toBe('Hello Joko')
  })
});
