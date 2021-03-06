import { Injectable } from '@angular/core';
import { Comment } from './app/mock/comments';
import { Post } from './app/mock/post';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = 'http://localhost/Social/web/index.php';

  constructor(private http: HttpClient) { }

   getPostComments(id: Number): Observable<Comment>{
    return this.http.get<Comment>(this.url+"/api/post/detail/"+id+"/comments", 
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
   }

   getPostTotalNumberComments(id: Number): Observable<Post>{
    return this.http.get<Post>(this.url+"/api/post/detail/"+id+"/numberComments", 
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
   }

   addPostLike(id: Number): Observable<Post>{
    let bodyLike = `like=1`;
    return this.http.post<Post>(this.url+'/api/post/detail/'+id+'/addLike', bodyLike, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  addCommentLike(id: Number): Observable<Comment>{
    let bodyLike = `like=1`
    return this.http.post<Comment>(this.url+'/api/post/comment/'+id+'/addLike', bodyLike, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

   addComment(comment: Comment, id: Number): Observable<Comment>{
    let body = `idPost=${comment.idPost}&userName=${comment.userName}&userPicture=${comment.userPicture}&comment=${comment.comment}`;

    return this.http.post<Comment>(this.url+"/api/post/detail/"+id+"/addComment", body, 
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  editComment(idPost: Number, idComment: Number): Observable<Comment>{
    return this.http.get<Comment>(this.url+"/api/post/detail/"+idPost+"/editComment/"+idComment+"/get", {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  modifyEditComment(comment: Comment, idComment: Number, idPost: Number): Observable<Comment>{
    let body = `comment=${comment.comment}`;

    return this.http.post<Comment>(this.url+"/api/post/detail/"+idPost+"/editComment/"+idComment+"/edit", body, 
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  
  deleteComment(idPost: Number, idComment: Number): Observable<Comment>{
    return this.http.get<Comment>(this.url+"/api/post/detail/"+idPost+"/comments/delete/"+idComment, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  }

}
