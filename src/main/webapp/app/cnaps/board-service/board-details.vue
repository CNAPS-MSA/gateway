<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <b-alert :show="dismissCountDown"
                     dismissible
                     :variant="alertType"
                     @dismissed="dismissCountDown=0"
                     @dismiss-count-down="countDownChanged">
                {{alertMessage}}
            </b-alert>
            <div v-if="board">
                <h2 class="jh-entity-heading"><span v-text="$t('gatewayApp.boardBoard.detail.title')">Board Details</span></h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('gatewayApp.boardBoard.title')">Title</span>
                    </dt>
                    <dd>
                        <span>{{board.title}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.boardBoard.createdDate')">Created Date</span>
                    </dt>
                    <dd>
                        <span>{{board.createdDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.boardBoard.writerName')">WriterName</span>
                    </dt>
                    <dd>
                        <span>{{board.writerName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.boardBoard.hit')">Hit</span>
                    </dt>
                    <dd>
                        <span>{{board.hit}} </span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.boardBoard.category')">Category</span>
                    </dt>
                    <dd>
                        <span>{{board.category}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.boardBoard.content')">Content</span>
                    </dt>
                    <dd style="white-space: pre;">
                        <span>{{board.content}}</span>
                    </dd>
                    <dt v-if="this.userId === board.writerId">
                        <span>수정 및 삭제</span>
                    </dt>
                    <dd>
                        <router-link v-if="this.userId===board.writerId" :to="{name: 'BoardEdit', params: {boardId: board.id}}" tag="button"  class="btn btn-primary">
                            <font-awesome-icon icon="plus"></font-awesome-icon>
                            <span>게시글 수정</span>
                        </router-link>
                        <b-button v-if="this.userId === board.writerId" v-on:click="prepareRemove(board)"
                                  variant="danger"
                                  class="btn btn-danger"
                                  v-b-modal.removeEntity>
                            <font-awesome-icon icon="times"></font-awesome-icon>
                            <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                        </b-button>
<!--                        <button v-if="this.userId === board.writerId" type="button" class="btn btn-primary" @click="deleteBoard(board.id)">-->
<!--                            <span>게시글 삭제</span>-->
<!--                        </button>-->
                    </dd>
                </dl>
            </div>
<!--            comment form -->
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <div>
                    <div class="form-group">
                        <label class="form-control-label" for="comment-content">댓글</label>
                        <input type="text" class="form-control" name="content" id="comment-content" placeholder="내용을 입력하세요."
                               :class="{'valid': !$v.comment.content.$invalid, 'invalid': $v.comment.content.$invalid }"
                               v-model="comment.content" required/>
                    </div>
                </div>
                <div>
                    <button type="submit" style="margin-bottom: 20px" id="save-entity" :disabled="$v.comment.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="plus"></font-awesome-icon>&nbsp;<span>댓글 등록</span>
                    </button>
                </div>
            </form>
<!--            comment list-->

            <div v-if="commentList && commentList.length >0" v-for="comments in commentList" :key="comments.id">
                <div class="card border-primary mb-3" >
                    <div class="card-header">댓글 {{ comments.id }}</div>
                    <div class="card-body">
                        <h5 class="card-title"> 작성자 {{ comments.writerName}}</h5>
                            <p class="card-text">{{ comments.content }} </p>

<!--                    <div class="card-footer">-->
                        <div  v-if="checkWriterIdentity(comments.writerId)">
                            <b-button v-on:click="prepareEditComment(comments.content, comments.id)"
                                      class = "btn btn-info btn-sm"
                                      v-b-modal.editComment>
                                <font-awesome-icon icon="plus"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </b-button>
                            <b-button v-on:click="prepareRemoveComment(comments.id)"
                                      class="btn btn-danger btn-sm float-right"
                                      v-b-modal.deleteComment>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </div>
<!--                    </div>-->
                </div>
            </div>
<!--            <div v-show="commentList&& commentList.length > 0">-->
<!--                <div class="row justify-content-center">-->
<!--                    <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>-->
<!--                </div>-->
<!--                <div class="row justify-content-center">-->
<!--                    <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>-->
<!--                </div>-->
<!--            </div>-->
    </div>


        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="gatewayApp.boardBoard.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-board-heading" v-text="$t('gatewayApp.boardBoard.delete.question')">Are you sure you want to delete this Board?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-board" v-text="$t('entity.action.delete')" v-on:click="deleteBoard(board.id)">Delete</button>
            </div>
        </b-modal>
        <b-modal ref="deleteComment" id="deleteComment" >
            <span slot="modal-title"><span id="gatewayApp.boardBoard.delete.commentQuestion" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-comment-heading" v-text="$t('gatewayApp.boardBoard.delete.commentQuestion')">Are you sure you want to delete this Comment?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeCommentDeleteDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-comment" v-text="$t('entity.action.delete')" v-on:click="deleteComment()">Delete</button>
            </div>
        </b-modal>
        <b-modal ref="editComment" id="editComment" >
            <span slot="modal-title"><span>댓글 수정</span></span>
            <div class="modal-body">
<!--                <p id="jhi-delete-book-heading" v-text="$t('gatewayApp.boardBoard.delete.question')">Are you sure you want to delete this Board?</p>-->
                <form name="editForm" role="form" novalidate v-on:submit.prevent="editComment()" >
                    <div>
                        <div class="form-group">
                            <label class="form-control-label" for="editComment-content">댓글</label>
                            <input type="text" class="form-control" name="edit-content" id="editComment-content"
                                   :class="{'valid': !$v.editedComment.content.$invalid, 'invalid': $v.editedComment.content.$invalid }"
                                   v-model="editedComment.content" required/>

                        </div>
                    </div>
                </form>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeCommentEditDialog()">Cancel</button>
                <button type="submit" class="btn btn-primary" id="jhi-confirm-edit-comment" v-text="$t('entity.action.edit')" :disabled="$v.editedComment.$invalid || isSaving" v-on:click="editComment()">Edit</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./board-details.component.ts">
</script>
